/** List item — proposed: GET {apiUrl}/achievements (paginated). */
export interface StudentAchievementListItem {
  id: number;
  studentName: string;
  title: string;
  summary: string;
  academicYear: string;
  category?: string | null;
  imageUrl?: string | null;
}

/** Detail — proposed: GET {apiUrl}/achievements/{id}. */
export interface StudentAchievementDetail extends StudentAchievementListItem {
  description: string;
}
