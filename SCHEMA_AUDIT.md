# Database Schema Audit

| Model | Status | Notes |
| :--- | :--- | :--- |
| **User** | 🟢 **Core** | Essential for auth & profile. |
| **Account** | 🟢 **Core** | Required by NextAuth (OAuth). |
| **Session** | 🟢 **Core** | Required by NextAuth. |
| **VerificationToken** | 🟢 **Core** | Required by NextAuth (Magic links). |
| **Track** | 🟢 **Core** | Top-level of curriculum. |
| **Phase** | 🟢 **Core** | Grouping of skills. |
| **Skill** | 🟢 **Core** | Granular learning topics. |
| **Milestone** | 🟢 **Core** | Checkpoints for validation. |
| **MilestoneQuestion** | 🟢 **Core** | Assessment questions. |
| **MilestoneAnswerOption** | 🟢 **Core** | MCQ options. |
| **UserRoadmap** | 🟢 **Core** | Links User → Track. |
| **UserMilestoneProgress** | 🟢 **Core** | Tracks individual user progress. |
| **Sheet** | 🔴 **Legacy** | DSA Sheets. Candidate for removal v2. |
| **Topic** | 🔴 **Legacy** | Associated with Sheets. |
| **Subtopic** | 🔴 **Legacy** | Associated with Sheets. |
| **Problem** | 🔴 **Legacy** | DSA Problems. |
| **ProblemSheet** | 🔴 **Legacy** | Junction table. |
| **ProblemSubtopic** | 🔴 **Legacy** | Junction table. |
| **UserProblemProgress** | 🔴 **Legacy** | Legacy progress tracking. |
| **company_tags** | 🔴 **Legacy** | Metadata for problems. |
| **problem_company_tags** | 🔴 **Legacy** | Junction table. |

## Recommendations

1.  **Strict separation**: Keep Legacy models for now to avoid data loss during MVP launch, but do not add relations to new Core models.
2.  **Missing Models**: None. The current schema covers Auth, Curriculum, and Progress perfectly.
3.  **Merges**: `Skill` and `Milestone` could technically be merged, but keeping them separate (`Skill` = content, `Milestone` = checkpoint) is cleaner for the "Validation" feature.

## Action
No destructive schema changes required immediately. We will treat red-marked models as "Read-Only/Deprecated".
