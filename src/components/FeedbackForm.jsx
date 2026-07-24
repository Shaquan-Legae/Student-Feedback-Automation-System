import { useState } from "react";
import Alert from "./Alert";
import Button from "./Button";
import InputField from "./InputField";
import Rating from "./Rating";
import TextArea from "./TextArea";

const FeedbackForm = () => {
    const initialForm = {
        studentName: "",
        email: "",
        course: "",
        feedback: "",
    };

    const [form, setForm] = useState(initialForm);
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        type: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        // Clear alerts while typing
        setAlert({
            type: "",
            message: "",
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.studentName.trim()) {
            newErrors.studentName = "Student name is required.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
            newErrors.email = "Please enter a valid email.";
        }

        if (!form.course.trim()) {
            newErrors.course = "Course name is required.";
        }

        if (!rating) {
            newErrors.rating = "Please select a rating.";
        }

        if (!form.feedback.trim()) {
            newErrors.feedback = "Feedback is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setForm(initialForm);
        setRating(0);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setAlert({
            type: "",
            message: "",
        });

        if (!validateForm()) {
            setAlert({
                type: "warning",
                message: "Please fix the highlighted fields.",
            });
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "https://shaquan.app.n8n.cloud/webhook-test/student-feedback",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        studentName: form.studentName,
                        email: form.email,
                        course: form.course,
                        rating,
                        feedback: form.feedback,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit feedback.");
            }

            setAlert({
                type: "success",
                message: "Feedback submitted successfully!",
            });

            resetForm();
        } catch (error) {
            console.error(error);

            setAlert({
                type: "error",
                message: "Failed to submit feedback. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg"
        >

            <InputField
                label="Student Name"
                type="text"
                name="studentName"
                value={form.studentName}
                placeholder="Enter your full name"
                onChange={handleChange}
                error={errors.studentName}
            />

            <InputField
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter your email address"
                onChange={handleChange}
                error={errors.email}
            />

            <InputField
                label="Course Name"
                type="text"
                name="course"
                value={form.course}
                placeholder="Enter your course name"
                onChange={handleChange}
                error={errors.course}
            />

            <Rating
                rating={rating}
                setRating={(value) => {
                    setRating(value);

                    setErrors((prev) => ({
                        ...prev,
                        rating: "",
                    }));

                    setAlert({
                        type: "",
                        message: "",
                    });
                }}
                error={errors.rating}
            />

            <TextArea
                label="Feedback Message"
                name="feedback"
                value={form.feedback}
                placeholder="Share your feedback..."
                rows={5}
                onChange={handleChange}
                error={errors.feedback}
            />

            <Alert
                type={alert.type}
                message={alert.message}
            />

            <Button
                type="submit"
                text="Submit Feedback"
                loading={loading}
            />
        </form>
    );
};

export default FeedbackForm;
