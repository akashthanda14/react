/**
 * User interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

/**
 * Problem difficulty levels
 */
export type Difficulty = "Easy" | "Medium" | "Hard";
