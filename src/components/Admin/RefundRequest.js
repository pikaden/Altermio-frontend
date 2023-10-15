import React, { useState, useEffect } from 'react';


function RefundRequest() {
    const [refundRequests, setRefundRequests] = useState([]);

    useEffect(() => {
        fetch('/api/refund-requests')
            .then(response => response.json())
            .then(data => setRefundRequests(data));
    }, []);

    function handleApprove(refundRequestId) {
        fetch(`/api/refund-requests/${refundRequestId}`, {
            method: 'PUT',
            body: JSON.stringify({ status: 'approved' }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                const updatedRefundRequests = refundRequests.map(refundRequest => {
                    if (refundRequest.id === data.id) {
                        return data;
                    } else {
                        return refundRequest;
                    }
                });
                setRefundRequests(updatedRefundRequests);
            });
    }

    function handleReject(refundRequestId) {
        fetch(`/api/refund-requests/${refundRequestId}`, {
            method: 'PUT',
            body: JSON.stringify({ status: 'rejected' }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                const updatedRefundRequests = refundRequests.map(refundRequest => {
                    if (refundRequest.id === data.id) {
                        return data;
                    } else {
                        return refundRequest;
                    }
                });
                setRefundRequests(updatedRefundRequests);
            });
    }

    return (
        <div>
            <h1>Refund Requests</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer Name</th>
                        <th>Order ID</th>
                        <th>Refund Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    Body
                </tbody>
            </table>
        </div>
    );
}

export default RefundRequest;
