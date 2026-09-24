import createGoal from "@/actions/goal-actions";


export default function GoalForm() {
    return (
        <div>
            <form action={createGoal}>
                <input type="text" name="title" placeholder="e.g. Web Development" />
                <button type="submit">
                    Create
                </button>
            </form>
        </div>
    )
}