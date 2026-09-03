import { prisma } from "@/lib/prisma";
import { updateSubject } from "@/actions/subject-actions";

export default async function EditForm({
    params,
}: {
    params: Promise<{ subjectId: string }>
}) {
    const { subjectId } = await params;

    const subject = await prisma.subject.findUnique({
        where: {
            id: Number(subjectId),
        },
    });

    return (
        <div>
            <form action={updateSubject}>

                <input type="hidden" name="subjectId" value={subject?.id} />

                <input type="text" name="subject" defaultValue={subject?.name} />

                <button type="submit">
                    Update Subject
                </button>

            </form>
        </div>
    )
}