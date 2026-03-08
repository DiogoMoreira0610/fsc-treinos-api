import { NotFoundError } from "../errors/index.js";
import { prisma } from "../lib/db.js";
export class UpdateWorkoutSession {
    async execute(dto) {
        const workoutSession = await prisma.workoutSession.findFirst({
            where: {
                id: dto.sessionId,
                workoutDayId: dto.workoutDayId,
                workoutDay: {
                    workoutPlanId: dto.workoutPlanId,
                    workoutPlan: {
                        userId: dto.userId,
                    },
                },
            },
        });
        if (!workoutSession) {
            throw new NotFoundError("Workout session not found");
        }
        const updatedSession = await prisma.workoutSession.update({
            where: { id: workoutSession.id },
            data: {
                completedAt: new Date(dto.completedAt),
            },
        });
        return {
            id: updatedSession.id,
            completedAt: updatedSession.completedAt.toISOString(),
            startedAt: updatedSession.startedAt.toISOString(),
        };
    }
}
