import React from 'react';

const PowerPointEmbed = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f4f4f9',
            padding: '20px',
            margin: '0',
            fontFamily: 'Arial, sans-serif',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '960px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                border: '1px solid #ddd',
                padding: '10px',
            }}>
                <iframe
                    src="https://docs.google.com/presentation/d/e/2PACX-1vT-mttnNFlKC3abVCDuM4zhTehLT7SUvl8g7zpxf1HQUjQm7Vr7Nj8yzIJWqat0XegtfgvVwA7BWVK9/embed?start=true&loop=true&delayms=3000"
                    frameBorder="0"
                    width="100%"
                    height="500"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default PowerPointEmbed;
