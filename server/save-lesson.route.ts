import { Request, Response } from 'express';
import { setTimeout } from 'timers';
import { LESSONS } from './db-data';

export function saveLesson(req: Request, res: Response) {
  const id = Number(req.params['id']),
    changes = req.body;

  console.log('Saving lesson changes', id, JSON.stringify(changes));

  const newLesson = {
    ...LESSONS[id],
    ...changes,
  };

  LESSONS[id] = newLesson;

  console.log('new lesson version', newLesson);

  setTimeout(() => {
    res.status(200).json(LESSONS[id]);
  }, 1500);
}
