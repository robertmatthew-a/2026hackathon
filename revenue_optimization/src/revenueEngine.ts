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

        let allAds = Object.values(schedule)

        for(let i = 0; i < allAds.length; i++){
            for(let j = 0; j < ads.length; j++){
                if(allAds[i].some((someAd)=> ads[j].adId === someAd.adId)  && ads[j].advertiserId === advertiserId){
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
        let rev_multi = advertiserScheduledCount;
        if(rev_multi == 0) rev_multi = 1;
        
        let endRevenue = 0;

        let iter = advertiserScheduledCount == 0 ? 1 : advertiserScheduledCount;
        for(let i = 0; i < iter; i++)
        {
            endRevenue += baseRevenue * rev_multi;
            rev_multi *= decayRate;
        }

        return endRevenue;
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