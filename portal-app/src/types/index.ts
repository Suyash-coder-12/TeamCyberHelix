export type Role = 'ADMIN' | 'CORE' | 'MEMBER';

export interface Operative {
  id: string;
  name: string;
  designation: string;
  domain: string;
  email: string;
  github: string;
  avatar: string;
  status: 'Admin' | 'Lead' | 'Core' | 'Active';
  bio: string;
  skills: string[];
  activeProjects: string[];
  role?: Role;
  isAdmin?: boolean;
  password?: string;
  stationSlug: string;
  securityClearance: 'LEVEL-5 UNIVERSAL' | 'LEVEL-4 LEAD' | 'LEVEL-3 SPECIALIST' | 'LEVEL-2 OPERATIVE';
  assignedNode: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'P0' | 'P1' | 'P2';

export interface PodTask {
  id: string;
  title: string;
  operativeId: string;
  status: TaskStatus;
  priority: TaskPriority;
  tag: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  status: 'SUCCESS' | 'ALERT' | 'INFO';
  hash: string;
}

export interface SessionContext {
  token: string;
  operativeId: string;
  authTier: string;
  cluster: string;
  createdAt: number;
  expiresAt: number;
}

export interface AiChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: {
    latencyMs?: number;
    model?: string;
  };
}

export interface AiProviderConfig {
  provider: 'neuronova-core' | 'huggingface' | 'ollama-local';
  hfApiKey: string;
  hfModel: string;
  ollamaEndpoint: string;
  ollamaModel: string;
  speechEnabled: boolean;
  speechPitch: number;
  speechRate: number;
}

export interface IdeTab {
  id: string;
  name: string;
  language: 'python' | 'javascript' | 'sql' | 'html';
  code: string;
}

export type PortalTab = 
  | 'dashboard' 
  | 'pod-station' 
  | 'admin-console' 
  | 'github' 
  | 'neuronova' 
  | 'cloud-ide';
