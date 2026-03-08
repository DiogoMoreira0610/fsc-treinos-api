import dayjs from "dayjs";
import { NotFoundError } from "../errors/index.js";
import { prisma } from "../lib/db.js";
export class GetWorkoutDay {
    async execute(dto) {
        const workoutDay = await prisma.workoutDay.findFirst({
            where: {
                id: dto.workoutDayId,
                workoutPlanId: dto.workoutPlanId,
                workoutPlan: {
                    userId: dto.userId,
                },
            },
            include: {
                exercises: {
                    orderBy: { order: "asc" },
                },
                sessions: true,
            },
        });
        if (!workoutDay) {
            throw new NotFoundError("Workout day not found");
        }
        return {
            id: workoutDay.id,
            name: workoutDay.name,
            isRest: workoutDay.isRest,
            ...(workoutDay.coverImageUrl
                ? { coverImageUrl: workoutDay.coverImageUrl }
                : {}),
            estimatedDurationInSeconds: workoutDay.estimatedDurationInSeconds,
            weekDay: workoutDay.weekDay,
            exercises: workoutDay.exercises.map((exercise) => ({
                id: exercise.id,
                name: exercise.name,
                order: exercise.order,
                workoutDayId: exercise.workoutDayId,
                sets: exercise.sets,
                reps: exercise.reps,
                restTimeInSeconds: exercise.restTimeInSeconds,
            })),
            sessions: workoutDay.sessions.map((session) => ({
                id: session.id,
                workoutDayId: session.workoutDayId,
                ...(session.startedAt
                    ? { startedAt: dayjs(session.startedAt).format("YYYY-MM-DD") }
                    : {}),
                ...(session.completedAt
                    ? { completedAt: dayjs(session.completedAt).format("YYYY-MM-DD") }
                    : {}),
            })),
        };
    }
}
