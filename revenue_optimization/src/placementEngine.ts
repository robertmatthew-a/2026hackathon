export interface Ad {
    adId: string;
    advertiserId: string;
    timeReceived: number;
    timeout: number;
    duration: number;
    baseRevenue: number;
    bannedLocations: string[];
}

export interface Area {
    areaId: string;
    location: string;
    multiplier: number;
    totalScreens: number;
    timeWindow: number;
}

export interface ScheduledAd {
    adId: string;
    areaId: string;
    startTime: number;
    endTime: number;
}

export type Schedule = Record<string, ScheduledAd[]>;

export class PlacementEngine {

    constructor() {
    }

    isAdCompatibleWithArea(ad: Ad, area: Area): boolean {
        for (let i = 0; i < ad.bannedLocations.length; i++) {
            if (ad.bannedLocations[i] === area.location) {
                return false;
            }
        }
        return true;
    }

    getTotalScheduledTimeForArea(areaSchedule: ScheduledAd[]): number {
        let total = 0;

        areaSchedule.forEach(sched => {
            total += sched.endTime - sched.startTime
        });

        return total;
    }

    doesPlacementFitTimingConstraints(
        ad: Ad,
        area: Area,
        startTime: number
    ): boolean {

        return ad.duration + startTime <= area.timeWindow && startTime >= ad.timeReceived && startTime <= ad.timeReceived + ad.timeout;

    }

    isAdAlreadyScheduled(adId: string, schedule: Schedule): boolean {
        return Object.values(schedule).some(areaSchedule =>
            areaSchedule.some(ad => ad.adId === adId)
        );
    }

    canScheduleAd(
        ad: Ad,
        area: Area,
        schedule: Schedule,
        startTime: number
    ): boolean {
        // check ad compat with area
        if (!this.isAdCompatibleWithArea(ad, area)) return false;
        // check if placement fit time constraint
        if (!this.doesPlacementFitTimingConstraints(ad, area, startTime)) return false;
        // check if ad alr sched
        if (this.isAdAlreadyScheduled(ad.adId, schedule)) return false;

        let areaSchedule = schedule[area.areaId] || null;
        
          if(areaSchedule != null){
              for (let i = 0; i < areaSchedule.length; i++) {
                let ad1 = areaSchedule[i];

                    let endTime = startTime + ad.duration;
                    if((startTime > ad1.startTime && startTime < ad1.endTime )|| (endTime > ad1.startTime && endTime < ad1.endTime))
                        return false
            }
          }
        
        return true;
    }

    isAreaScheduleValid(area: Area, areaSchedule: ScheduledAd[], ads: Ad[]): boolean {
        // overlap check

        for (let i = 0; i < areaSchedule.length; i++) {
            let ad1 = areaSchedule[i];
            for (let j = i + 1; j < areaSchedule.length; j++) {
                let ad2 = areaSchedule[j];

                if ((ad2.startTime > ad1.startTime && ad2.startTime < ad1.endTime )|| (ad2.endTime > ad1.startTime && ad2.endTime < ad1.endTime))
                    return false
            }

            // check if ad exists in ads list

            let curr_ad = ads.find((listAd) => listAd.adId === ad1.adId)
            if (!curr_ad) return false;

            // check if ad fits area's time window
            if (!this.doesPlacementFitTimingConstraints(curr_ad, area, ad1.startTime)) return false;
        }
        
        for(let i = 0; i < ads.length; i++){

            for(let j = 0; j < ads[i].bannedLocations.length; j++){
                if(ads[i].bannedLocations[j] === area.location){
                    return false;
                }
            }
            
        }
        return true;
    }
}