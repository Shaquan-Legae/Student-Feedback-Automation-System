import FeedbackForm from "./components/FeedbackForm";

const App = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Student Feedback System
          </h1>

          <p className="mt-3 text-gray-600">
            We value your feedback. Please complete the form below to help us
            improve your learning experience.
          </p>
        </div>

        <FeedbackForm />
      </div>
    </main>
  );
};

export default App;