import { createSubject } from "@/actions/subject-actions";

export default function CreateSubjectPage() {
    return (
        <div>
            <form action={createSubject}>
                <input type="text" name="subjectName" />
                <button type="submit">
                    Create Subject
                </button>
            </form>
        </div>
    )
}