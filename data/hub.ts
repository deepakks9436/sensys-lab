export type StudentStatus = "On Track" | "At Risk" | "Delayed";

export type MilestoneStatus =
  | "Completed"
  | "In Progress"
  | "Not Started"
  | "At Risk"
  | "Delayed";

export type StudentMilestone = {
  title: string;
  plannedStart: string;
  plannedEnd: string;
  progress: number;
  weight: number;
  status: MilestoneStatus;
};

export type HubStudent = {
  id: string;
  name: string;
  programme: "PhD" | "MSc";
  intake: string;
  researchArea: string;
  project: string;
  progress: number;
  expectedProgress: number;
  status: StudentStatus;
  nextMilestone: string;
  nextMilestoneDate: string;
  currentPriority: string;
  blockers: string[];
  weeklyTasks: {
    title: string;
    completed: boolean;
  }[];
  milestones: StudentMilestone[];
};

export const hubStudents: HubStudent[] = [
  {
    id: "swarna-deb",
    name: "Swarna Deb",
    programme: "PhD",
    intake: "January 2027",
    researchArea: "Intelligent Microsystems",
    project: "Research project to be finalized",
    progress: 18,
    expectedProgress: 20,
    status: "On Track",
    nextMilestone: "Research problem definition",
    nextMilestoneDate: "February 28, 2027",
    currentPriority:
      "Literature mapping and identification of the primary research problem.",
    blockers: [],
    weeklyTasks: [
      {
        title: "Complete literature landscape",
        completed: true,
      },
      {
        title: "Identify three research gaps",
        completed: false,
      },
      {
        title: "Prepare first research-plan presentation",
        completed: false,
      },
    ],
    milestones: [
      {
        title: "Literature Review",
        plannedStart: "Jan 2027",
        plannedEnd: "Feb 2027",
        progress: 75,
        weight: 10,
        status: "In Progress",
      },
      {
        title: "Problem Definition",
        plannedStart: "Feb 2027",
        plannedEnd: "Mar 2027",
        progress: 30,
        weight: 10,
        status: "In Progress",
      },
      {
        title: "Experimental Plan",
        plannedStart: "Mar 2027",
        plannedEnd: "Apr 2027",
        progress: 0,
        weight: 10,
        status: "Not Started",
      },
      {
        title: "Platform Development",
        plannedStart: "Apr 2027",
        plannedEnd: "Aug 2027",
        progress: 0,
        weight: 25,
        status: "Not Started",
      },
      {
        title: "Optimization",
        plannedStart: "Aug 2027",
        plannedEnd: "Oct 2027",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
      {
        title: "Validation",
        plannedStart: "Oct 2027",
        plannedEnd: "Dec 2027",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
      {
        title: "Research Outputs",
        plannedStart: "Nov 2027",
        plannedEnd: "Ongoing",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
    ],
  },

  {
    id: "fortune-ogbonna",
    name: "Fortune Ogbonna",
    programme: "PhD",
    intake: "January 2027",
    researchArea: "Biointegrated Systems",
    project: "Research project to be finalized",
    progress: 15,
    expectedProgress: 20,
    status: "At Risk",
    nextMilestone: "Literature review",
    nextMilestoneDate: "February 28, 2027",
    currentPriority:
      "Establishing the research landscape and candidate sensing approaches.",
    blockers: ["Research scope requires further narrowing."],
    weeklyTasks: [
      {
        title: "Complete key-paper matrix",
        completed: true,
      },
      {
        title: "Shortlist sensing architectures",
        completed: false,
      },
      {
        title: "Discuss scope with project lead",
        completed: false,
      },
    ],
    milestones: [
      {
        title: "Literature Review",
        plannedStart: "Jan 2027",
        plannedEnd: "Feb 2027",
        progress: 60,
        weight: 10,
        status: "At Risk",
      },
      {
        title: "Problem Definition",
        plannedStart: "Feb 2027",
        plannedEnd: "Mar 2027",
        progress: 20,
        weight: 10,
        status: "In Progress",
      },
      {
        title: "Experimental Plan",
        plannedStart: "Mar 2027",
        plannedEnd: "Apr 2027",
        progress: 0,
        weight: 10,
        status: "Not Started",
      },
      {
        title: "Device Development",
        plannedStart: "Apr 2027",
        plannedEnd: "Aug 2027",
        progress: 0,
        weight: 25,
        status: "Not Started",
      },
      {
        title: "Characterization",
        plannedStart: "Aug 2027",
        plannedEnd: "Oct 2027",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
      {
        title: "Validation",
        plannedStart: "Oct 2027",
        plannedEnd: "Dec 2027",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
      {
        title: "Research Outputs",
        plannedStart: "Nov 2027",
        plannedEnd: "Ongoing",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
    ],
  },

  {
    id: "arunabh-bezbaruah",
    name: "Arunabh Bezbaruah",
    programme: "PhD",
    intake: "January 2027",
    researchArea: "Agri & Environmental Intelligence",
    project: "Research project to be finalized",
    progress: 22,
    expectedProgress: 20,
    status: "On Track",
    nextMilestone: "Experimental strategy",
    nextMilestoneDate: "March 15, 2027",
    currentPriority:
      "Defining the sensing architecture and experimental variables.",
    blockers: [],
    weeklyTasks: [
      {
        title: "Finalize problem statement",
        completed: true,
      },
      {
        title: "Prepare experimental variable matrix",
        completed: true,
      },
      {
        title: "Identify required instruments",
        completed: false,
      },
    ],
    milestones: [
      {
        title: "Literature Review",
        plannedStart: "Jan 2027",
        plannedEnd: "Feb 2027",
        progress: 90,
        weight: 10,
        status: "In Progress",
      },
      {
        title: "Problem Definition",
        plannedStart: "Feb 2027",
        plannedEnd: "Mar 2027",
        progress: 60,
        weight: 10,
        status: "In Progress",
      },
      {
        title: "Experimental Plan",
        plannedStart: "Mar 2027",
        plannedEnd: "Apr 2027",
        progress: 15,
        weight: 10,
        status: "In Progress",
      },
      {
        title: "Platform Development",
        plannedStart: "Apr 2027",
        plannedEnd: "Aug 2027",
        progress: 0,
        weight: 25,
        status: "Not Started",
      },
      {
        title: "Optimization",
        plannedStart: "Aug 2027",
        plannedEnd: "Oct 2027",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
      {
        title: "Validation",
        plannedStart: "Oct 2027",
        plannedEnd: "Dec 2027",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
      {
        title: "Research Outputs",
        plannedStart: "Nov 2027",
        plannedEnd: "Ongoing",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
    ],
  },

  {
    id: "nitish-reddy",
    name: "Nitish Reddy",
    programme: "PhD",
    intake: "January 2027",
    researchArea: "Intelligent Diagnostics",
    project: "Research project to be finalized",
    progress: 19,
    expectedProgress: 20,
    status: "On Track",
    nextMilestone: "Research architecture",
    nextMilestoneDate: "March 10, 2027",
    currentPriority:
      "Developing the first system-level research architecture.",
    blockers: [],
    weeklyTasks: [
      {
        title: "Complete gap analysis",
        completed: true,
      },
      {
        title: "Draft system architecture",
        completed: false,
      },
      {
        title: "Prepare literature presentation",
        completed: false,
      },
    ],
    milestones: [
      {
        title: "Literature Review",
        plannedStart: "Jan 2027",
        plannedEnd: "Feb 2027",
        progress: 80,
        weight: 10,
        status: "In Progress",
      },
      {
        title: "Problem Definition",
        plannedStart: "Feb 2027",
        plannedEnd: "Mar 2027",
        progress: 45,
        weight: 10,
        status: "In Progress",
      },
      {
        title: "Experimental Plan",
        plannedStart: "Mar 2027",
        plannedEnd: "Apr 2027",
        progress: 0,
        weight: 10,
        status: "Not Started",
      },
      {
        title: "Diagnostic Platform Development",
        plannedStart: "Apr 2027",
        plannedEnd: "Aug 2027",
        progress: 0,
        weight: 25,
        status: "Not Started",
      },
      {
        title: "Optimization",
        plannedStart: "Aug 2027",
        plannedEnd: "Oct 2027",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
      {
        title: "Validation",
        plannedStart: "Oct 2027",
        plannedEnd: "Dec 2027",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
      {
        title: "Research Outputs",
        plannedStart: "Nov 2027",
        plannedEnd: "Ongoing",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
    ],
  },

  {
    id: "savan-siddharth-ithagani",
    name: "Savan Siddharth Ithagani",
    programme: "PhD",
    intake: "January 2027",
    researchArea: "Intelligent Microsystems",
    project: "Research project to be finalized",
    progress: 12,
    expectedProgress: 20,
    status: "At Risk",
    nextMilestone: "Problem definition",
    nextMilestoneDate: "February 28, 2027",
    currentPriority: "Strengthening the preliminary literature review.",
    blockers: ["Literature review behind the planned schedule."],
    weeklyTasks: [
      {
        title: "Complete literature database",
        completed: false,
      },
      {
        title: "Identify key research gaps",
        completed: false,
      },
      {
        title: "Prepare progress summary",
        completed: true,
      },
    ],
    milestones: [
      {
        title: "Literature Review",
        plannedStart: "Jan 2027",
        plannedEnd: "Feb 2027",
        progress: 45,
        weight: 10,
        status: "At Risk",
      },
      {
        title: "Problem Definition",
        plannedStart: "Feb 2027",
        plannedEnd: "Mar 2027",
        progress: 10,
        weight: 10,
        status: "At Risk",
      },
      {
        title: "Experimental Plan",
        plannedStart: "Mar 2027",
        plannedEnd: "Apr 2027",
        progress: 0,
        weight: 10,
        status: "Not Started",
      },
      {
        title: "Platform Development",
        plannedStart: "Apr 2027",
        plannedEnd: "Aug 2027",
        progress: 0,
        weight: 25,
        status: "Not Started",
      },
      {
        title: "Optimization",
        plannedStart: "Aug 2027",
        plannedEnd: "Oct 2027",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
      {
        title: "Validation",
        plannedStart: "Oct 2027",
        plannedEnd: "Dec 2027",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
      {
        title: "Research Outputs",
        plannedStart: "Nov 2027",
        plannedEnd: "Ongoing",
        progress: 0,
        weight: 15,
        status: "Not Started",
      },
    ],
  },

  ...[
    "Ayomide Adeyemi",
    "Pritam Bol",
    "Edna Atisu",
    "Arman Kashyap",
    "Aditya Varshney",
    "Ajay Singh",
    "Sivatharshan Sivashanmugamoorthy",
  ].map((name, index) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    programme: "MSc" as const,
    intake: "January 2027",
    researchArea:
      index % 3 === 0
        ? "Intelligent Diagnostics"
        : index % 3 === 1
          ? "Biointegrated Systems"
          : "Agri & Environmental Intelligence",
    project: "Research project to be finalized",
    progress: 10 + index * 2,
    expectedProgress: 16,
    status:
      index === 5
        ? ("At Risk" as const)
        : ("On Track" as const),
    nextMilestone: "Research problem definition",
    nextMilestoneDate: "March 2027",
    currentPriority:
      "Literature review, problem definition, and preparation of the initial research plan.",
    blockers:
      index === 5
        ? ["Initial research scope requires refinement."]
        : [],
    weeklyTasks: [
      {
        title: "Complete literature review",
        completed: index < 3,
      },
      {
        title: "Identify research gaps",
        completed: false,
      },
      {
        title: "Prepare initial research presentation",
        completed: false,
      },
    ],
    milestones: [
      {
        title: "Literature Review",
        plannedStart: "Jan 2027",
        plannedEnd: "Feb 2027",
        progress: 45 + index * 5,
        weight: 15,
        status: "In Progress" as const,
      },
      {
        title: "Problem Definition",
        plannedStart: "Feb 2027",
        plannedEnd: "Mar 2027",
        progress: 10,
        weight: 10,
        status: "In Progress" as const,
      },
      {
        title: "Experimental Plan",
        plannedStart: "Mar 2027",
        plannedEnd: "Apr 2027",
        progress: 0,
        weight: 10,
        status: "Not Started" as const,
      },
      {
        title: "Platform Development",
        plannedStart: "Apr 2027",
        plannedEnd: "Jul 2027",
        progress: 0,
        weight: 25,
        status: "Not Started" as const,
      },
      {
        title: "Optimization & Characterization",
        plannedStart: "Jul 2027",
        plannedEnd: "Sep 2027",
        progress: 0,
        weight: 20,
        status: "Not Started" as const,
      },
      {
        title: "Validation",
        plannedStart: "Sep 2027",
        plannedEnd: "Oct 2027",
        progress: 0,
        weight: 10,
        status: "Not Started" as const,
      },
      {
        title: "Thesis / Research Outputs",
        plannedStart: "Oct 2027",
        plannedEnd: "Ongoing",
        progress: 0,
        weight: 10,
        status: "Not Started" as const,
      },
    ],
  })),
];

export const hubActions = [
  {
    id: 1,
    task: "Complete literature gap analysis",
    owner: "Swarna Deb",
    project: "Research planning",
    due: "Jan 22",
    status: "In Progress",
    priority: "High",
    source: "Weekly Meeting",
  },
  {
    id: 2,
    task: "Prepare experimental architecture",
    owner: "Arunabh Bezbaruah",
    project: "Research planning",
    due: "Jan 24",
    status: "Open",
    priority: "Medium",
    source: "Supervisor Discussion",
  },
  {
    id: 3,
    task: "Refine research scope",
    owner: "Fortune Ogbonna",
    project: "Research planning",
    due: "Jan 20",
    status: "Overdue",
    priority: "High",
    source: "Weekly Meeting",
  },
  {
    id: 4,
    task: "Prepare first research presentation",
    owner: "Nitish Reddy",
    project: "Research planning",
    due: "Jan 27",
    status: "Open",
    priority: "Medium",
    source: "Weekly Meeting",
  },
  {
    id: 5,
    task: "Update literature database",
    owner: "Savan Siddharth Ithagani",
    project: "Research planning",
    due: "Jan 21",
    status: "In Progress",
    priority: "High",
    source: "Weekly Meeting",
  },
];

export const hubMeetings = [
  {
    id: "weekly-jan-16",
    title: "SenSys Weekly Research Meeting",
    date: "January 16, 2027",
    time: "10:00 AM",
    attendees: 12,
    actions: 8,
    decisions: 4,
    status: "Completed",
  },
  {
    id: "weekly-jan-23",
    title: "SenSys Weekly Research Meeting",
    date: "January 23, 2027",
    time: "10:00 AM",
    attendees: 0,
    actions: 0,
    decisions: 0,
    status: "Upcoming",
  },
];

export const upcomingMilestones = hubStudents
  .slice(0, 6)
  .map((student) => ({
    student: student.name,
    programme: student.programme,
    milestone: student.nextMilestone,
    due: student.nextMilestoneDate,
    status: student.status,
  }));