import React, { useContext, useEffect, createContext, useState } from 'react';
import './Assignments.css'

import { Switch, Route } from 'react-router-dom';
import EditAssignments from './EditAssignments/EditAssignments';
import ViewAssignments from './ViewAssignments/ViewAssignments';
import SubmitAssignment from './SubmitAssignment/SubmitAssignment';
import EvaluateAssignment from './EvaluateAssignment/EvaluateAssignment';

export const EditContext = createContext();
export const AssignmentModeContext = createContext();
export const AssignmentsContext = createContext();



function Assignments() {

    const [assignmentMode, setAssignmentMode] = useState("view");
    const [assignments, setAssignments] = useState();

    return (
        <div className="Assignments">

            <AssignmentsContext.Provider value={[assignments, setAssignments]}>
                <AssignmentModeContext.Provider value={[assignmentMode, setAssignmentMode]}>
                    <Switch>

                        <Route path="/dashboard/course/:courseId"> <ViewAssignments /></Route>
                        <Route path="/assignments/evaluate/:assignmentId"> <EvaluateAssignment /></Route>
                        <Route path="/assignments/submit/:assignmentId"> <SubmitAssignment /></Route>
                        <Route path="/assignments/edit/:assignmentId/course/:courseId"> <EditAssignments /></Route>
                        <Route path="/assignments/add/course/:courseId"> <EditAssignments /></Route>
                    </Switch>
                </AssignmentModeContext.Provider>
            </AssignmentsContext.Provider>
        </div>
    )
}

export default Assignments
