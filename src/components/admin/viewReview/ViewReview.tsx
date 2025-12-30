'use client';

import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const AdminReviewPanel = () => {
  interface Review {
    id: string;
    rating: number;
    comment: string;
    name: string;
    email: string;
    Date: string;
    approved: boolean;
  }

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch reviews from Firestore
  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const reviewRef = collection(db, 'reviews');
      const querySnapshot = await getDocs(reviewRef);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Review));
      setReviews(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to fetch reviews. Please check Firestore rules and document path.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review
  const handleDeleteReview = async (reviewId: string) => {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      await deleteDoc(reviewRef);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (err) {
      console.error("Delete error:", err);
      setError('Failed to delete review.');
    }
  };

  // Approve/Reject review
  const handleApproveReview = async (reviewId: string, isApproved: boolean) => {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      await updateDoc(reviewRef, { approved: isApproved });
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, approved: isApproved } : review
        )
      );
    } catch (err) {
      console.error("Approve/Reject error:", err);
      setError('Failed to approve/reject review.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-box z-index-1">
      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div>Loading reviews...</div>
      ) : (
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p>No reviews to manage.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="avatar placeholder mr-4">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                        <User size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.email}</p> {/* Email is now displayed */}
                      <div className="rating rating-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            name={`rating-${review.id}`}
                            className="mask mask-star-2 bg-orange-400"
                            checked={star <= review.rating}
                            readOnly
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">{review.Date}</div>

                    {/* Admin Controls */}
                    <div className="space-x-2">
                      <button
                        onClick={() => handleApproveReview(review.id, !review.approved)}
                        className={`btn btn-sm ${review.approved ? 'btn-error' : 'btn-success'}`}
                      >
                        {review.approved ? 'Reject' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminReviewPanel;
