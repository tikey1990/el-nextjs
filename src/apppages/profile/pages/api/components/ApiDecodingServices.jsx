import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula.js";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import PropTypes from "prop-types";
import React from "react";

/**
 * Компонент расшифровки услуг
 * @param name
 * @constructor
 */
export const ApiDecodingServices = ({ name }) => {
    return (
        <>
            <div className="row flex justify-between">
                <h2 className="text-[18px] sm:text-[20px] text-gray-600 font-pn-boldit">{name}</h2>
            </div>

            <SyntaxHighlighter className="rounded-lg" language="json" style={dracula} wrapLongLines>
                {`{
    response:
    {
        boosts: Бусты
        auto_post_views: Автопросмотры
        views: Просмотры
        likes: Лайки
        subs: Подписчики
        disslikes: Дизлайки
        comments: Комментарии
        reply_comments: Ответы на комментарии
        comment_likes: Лайки комментариев
        reposts: Репосты
        group_subs: Подписчики в группу
        friends: Друзья
        video_views: Просмотры видео
        clip_views: Просмотры клипов
        post_views: Просмотры постов
        views_history: Просмотры историй
        poll_votes: Опросы
        reports: Жалобы
        chat_participants: Участники беседы
        story_views: Просмотры истории
        stream_viewers: Зрители трансляции
        channel_subs: Подписчики канала
        listenings: Прослушивания
        listenings: Прослушивания
        retweets: Ретвиты
    }
}`}
            </SyntaxHighlighter>
        </>
    );
};

ApiDecodingServices.propTypes = {
    /**
     * Название секции
     */
    name: PropTypes.string.isRequired,
};
