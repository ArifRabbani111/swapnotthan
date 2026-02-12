export default function TermsPage() {
    return (
        <div className="flex flex-col w-full">
            <section className="py-20 bg-muted/30 text-center">
                <div className="container mx-auto px-4 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
                    <p className="max-w-2xl mx-auto text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </section>

            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 max-w-3xl prose prose-neutral dark:prose-invert">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using the Swapnotthan Foundation website and services, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                    </p>

                    <h2>2. Use of Services</h2>
                    <p>
                        Our services are provided for lawful purposes only. You may not use our platform for any illegal or unauthorized purpose. We reserve the right to suspend or terminate access at our discretion.
                    </p>

                    <h2>3. Donations and Contributions</h2>
                    <p>
                        Donations made through our platform are voluntary and non-refundable. We use all contributions to further our charitable mission. For questions about donations, please contact us.
                    </p>

                    <h2>4. Privacy</h2>
                    <p>
                        Your use of our services is also governed by our privacy practices. We collect and use information as described in our privacy policy to operate and improve our services.
                    </p>

                    <h2>5. Contact</h2>
                    <p>
                        For any questions about these terms, please contact us at{" "}
                        <a href="mailto:info@swapnotthan.org" className="text-primary underline">info@swapnotthan.org</a> or visit our{" "}
                        <a href="/contact" className="text-primary underline">Contact</a> page.
                    </p>
                </div>
            </section>
        </div>
    );
}
