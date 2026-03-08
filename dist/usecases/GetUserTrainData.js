import { prisma } from "../lib/db.js";
export class GetUserTrainData {
    async execute(dto) {
        const trainData = await prisma.userTrainData.findUnique({
            where: { userId: dto.userId },
            include: { user: true },
        });
        if (!trainData) {
            return null;
        }
        return {
            userId: trainData.userId,
            userName: trainData.user.name,
            weightInGrams: trainData.weightInGrams,
            heightInCentimeters: trainData.heightInCentimeters,
            age: trainData.age,
            bodyFatPercentage: trainData.bodyFatPercentage * 100,
        };
    }
}
