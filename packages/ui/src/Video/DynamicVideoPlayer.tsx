
import ReactPlayer from 'react-player/lazy'

const ForwardedReactPlayer = ({videoRef, ...restProps}: any) => (
    <ReactPlayer {...restProps} ref={videoRef} />
);

export default ForwardedReactPlayer;