const handleUpiConfirm = async () => {
    try {
        setProcessing(true);

        const verifyPayload = {
            paymentId: upiQr.paymentId,
            razorpayOrderId: upiQr.orderId,
            razorpayPaymentId: "upi_" + Math.floor(Math.random() * 10000000),
            razorpaySignature: "upi_manual_signature"
        };

        const config = {
            headers: { Authorization: `Bearer ${authUser.token}` }
        };

        const res = await axios.post(
            "http://localhost:5000/api/payments/verify",
            verifyPayload,
            config
        );

        if (res.data.success) {
            setShowUpiModal(false);

            navigate(`/bookingsuccess/${res.data.booking?._id}`, {
                state: {
                    payment: res.data.payment,
                    booking: res.data.booking,
                    property
                }
            });
        }

    } catch (err) {
        alert("Verification failed");
    } finally {
        setProcessing(false);
    }
};