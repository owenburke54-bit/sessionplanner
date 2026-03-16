'use client';

import { useState, useEffect, useCallback } from 'react';
import { PlannedSession } from '@/types';

const STORAGE_KEY = 'sp_saved_sessions';
const VERSION = 1;
const MAX_SESSIONS = 50;

interface StorageSchema {
  version: number;
  sessions: PlannedSession[];
}

function loadFromStorage(): PlannedSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: StorageSchema = JSON.parse(raw);
    if (parsed.version !== VERSION) return [];
    return parsed.sessions ?? [];
  } catch {
    return [];
  }
}

function saveToStorage(sessions: PlannedSession[]): void {
  if (typeof window === 'undefined') return;
  try {
    const schema: StorageSchema = { version: VERSION, sessions };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
  } catch {
    // storage full or unavailable — ignore
  }
}

export function useSavedSessions() {
  const [sessions, setSessions] = useState<PlannedSession[]>([]);

  useEffect(() => {
    setSessions(loadFromStorage());
  }, []);

  const save = useCallback((session: PlannedSession) => {
    setSessions((prev) => {
      const exists = prev.some((s) => s.id === session.id);
      const next = exists
        ? prev.map((s) => (s.id === session.id ? session : s))
        : [session, ...prev].slice(0, MAX_SESSIONS);
      saveToStorage(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const getById = useCallback(
    (id: string) => sessions.find((s) => s.id === id) ?? null,
    [sessions],
  );

  return { sessions, save, remove, getById };
}
