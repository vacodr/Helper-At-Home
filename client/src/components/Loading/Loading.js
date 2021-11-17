import React from 'react';

const Loading = () => {
    return (
        <div style={{height: "600px"}} className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status"></div>
        </div>
    );
};

export default Loading;