import React from "react"

export function RequirementsList() {
    return (
        <div>
            RequirementsList:
            <ul>
                <li>Show list of todos</li>
                <li>When typing in the input box enable add option</li>
                <li>Show success message when task is added to list</li>
                <li>Clear input when task is added successfully</li>
                <li>Don't allow special symbols. Show error message when add is initiated but failed</li>
                <li>Don't clear input when adding failed due to error</li>
            </ul>
        </div>
    )
}
