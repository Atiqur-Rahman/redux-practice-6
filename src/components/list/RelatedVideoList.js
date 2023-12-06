import React, { useEffect } from 'react';
import RelatedVideoListItem from './RelatedVideoListItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedVideosAsync } from '../../features/relatedVideos/relatedVideosSlice';
import Loading from '../ui/Loading';

const RelatedVideoList = ({ currentVideoId, tags }) => {
    const dispatch = useDispatch();
    const { relatedVideos, isLoading, isError, error } = useSelector((state) => state.relatedVideos);

    useEffect(() => {
        dispatch(fetchRelatedVideosAsync({ id: currentVideoId, tags }));
    }, [dispatch, currentVideoId, tags]);

    let content = null;

    if (isLoading) content = <Loading />;

    if (!isLoading && isError) content = <div className="col-span-12">{error}</div>;

    if (!isLoading && !isError && relatedVideos.length === 0) content = <div className="col-span-12">No RelatedVideos Found</div>;

    if (!isLoading && !isError && relatedVideos.length > 0) content = relatedVideos.map((video) => <RelatedVideoListItem key={video.id} video={video} />);

    return <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">{content}</div>;
};

export default RelatedVideoList;
