export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-invert">
                <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                <p className="mb-4">
                    At AkashCode, we take your privacy seriously. This minimal policy outlines how we handle your data.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-2">1. Data Collection</h3>
                <p className="mb-4">
                    We collect your name, email, and learning progress data to provide the personalized roadmap service.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-2">2. Data Usage</h3>
                <p className="mb-4">
                    Your data is used solely to track your progress and improve the learning experience. We do not sell your data.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-2">3. Contact</h3>
                <p>
                    For any privacy concerns, please reach out via our contact channels.
                </p>
            </div>
        </div>
    );
}
