import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { ProfileSetup } from "./components/ProfileSetup";
import { Dashboard } from "./components/Dashboard";
import { LearningRoadmap } from "./components/LearningRoadmap";
import { Mentor } from "./components/Mentor";
import { InterviewPrep } from "./components/InterviewPrep";
import { JobTracker } from "./components/JobTracker";
import { SkillsAssessment } from "./components/SkillsAssessment";
import { CareerComparison } from "./components/CareerComparison";
import { ResourceLibrary } from "./components/ResourceLibrary";
import { Admin } from "./components/Admin";
import { TaskManager } from "./components/TaskManager";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/setup",
    Component: ProfileSetup,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/roadmap",
    Component: LearningRoadmap,
  },
  {
    path: "/mentor",
    Component: Mentor,
  },
  {
    path: "/interview-prep",
    Component: InterviewPrep,
  },
  {
    path: "/job-tracker",
    Component: JobTracker,
  },
  {
    path: "/skills-assessment",
    Component: SkillsAssessment,
  },
  {
    path: "/career-comparison",
    Component: CareerComparison,
  },
  {
    path: "/resources",
    Component: ResourceLibrary,
  },
  {
    path: "/admin",
    Component: Admin,
  },
  {
    path: "/tasks",
    Component: TaskManager,
  },
]);