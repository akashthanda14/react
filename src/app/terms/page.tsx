export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-invert">
                <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                <p className="mb-4">
                    By using AkashCode, you agree to these terms.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-2">1. Usage</h3>
                <p className="mb-4">
                    Our platform is for educational purposes. You agree to use it responsibly and not to abuse our API or services.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-2">2. Content</h3>
                <p className="mb-4">
                    The roadmaps and content are curated for learning. We strive for accuracy but cannot guarantee it.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-2">3. Termination</h3>
                <p>
                    We reserve the right to suspend accounts that violate these terms.
                </p>
            </div>
        </div>
    );
}
