export interface QualityControlData {
    key: string;
    totalReads: number;
    totalReadsAfterFiltering: number;
    humanMappedReads: number;
    humanKrakenReads: number;
    totalHumanReadsPercent: string;
    bacterialReadsPercent: string;
    virusReadsPercent: string;
    eukaryoteReadsPercent: string;
    otherReadsPercent: string;
    unclassifiedReadsPercent: string;
    spikeReadsPercent: string;
    spike: string;
  }