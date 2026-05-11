import { VolunteerForm } from "@/components/sections/VolunteerForm";

export default function VolunteerPage() {
    return (
        <div className="container mx-auto py-20 px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-primary">Join Us as a Volunteer</h1>
                <p className="text-lg text-muted-foreground">
                    Become a part of &apos;Swapnotthan&apos; and help us make a difference in the lives of those who need it most.
                    Fill out the form below and our team will get back to you shortly.
                </p>
            </div>
            <VolunteerForm />
        </div>
    );
}
