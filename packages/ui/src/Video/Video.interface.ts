export interface VideoActions {
    onPlay: () => void;
    onPause: () => void;
    onEnded: () => void;
}

export interface OverlayProps {
    actions: VideoActions;
    state: VIDEO_STATE;
}

export enum VIDEO_STATE {
    NOT_STARTED,
    PLAYING,
    PAUSED,
    FINISHED,
}




