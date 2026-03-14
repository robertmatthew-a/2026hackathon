import { Ad, Area, Schedule, ScheduledAd, PlacementEngine } from './placementEngine';

export class RevenueEngine {
    placementEngine: PlacementEngine;

    constructor(placementEngine: PlacementEngine) {
        this.placementEngine = placementEngine;
    }

    getAdvertiserScheduleCount(
        advertiserId: string,
        ads: Ad[],
        schedule: Schedule
    ): number {
        let numAds = 0;

        for(let i = 0; i < schedule.scheduledAd.length; i++){

            for(let j = 0; j < ads.length; j++){
                if(schedule.scheduleAd[i].adId === ads[i].adId && ads[i].advertiserId === advertiserId){
                    numAds++;
                }
            }
            
        }

        return numAds;
    }

    calculateDiminishedRevenue(
        baseRevenue: number,
        advertiserScheduledCount: number,
        decayRate: number
    ): number {
        return 0;
    }

    calculatePlacementRevenue(
        ad: Ad,
        areas: Area[],
        ads: Ad[],
        schedule: Schedule,
        decayRate: number
    ): number {
        return 0;
    }

    getAdvertiserDiversity(ads: Ad[], schedule: Schedule): number {
        return 0;
    }

    getAreaRevenue(
        area: Area,
        areasArray: Area[],
        fullSchedule: Schedule,
        ads: Ad[],
        decayRate: number
    ): number {
        return 0;
    }
}