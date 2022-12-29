import store from '../store'

export function event_views(a) {//浏览
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.ARTICLE, // 题材类型，请查看_UserEvents.subjectType
        };
        _UserEvents.click(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_share(a) {//分享
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.ARTICLE, // 题材类型，请查看_UserEvents.subjectType
        };
        _UserEvents.share(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_stay(staySecond,a) {//停留
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.ARTICLE, // 题材类型，请查看_UserEvents.subjectType
            staySecond: staySecond//停留时间(s)
        };
        _UserEvents.stay(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_pv(readPercent,a) {//浏览百分比
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.ARTICLE, // 题材类型，请查看_UserEvents.subjectType
            readPercent: readPercent//阅读进度(*100)
        };
        _UserEvents.pv(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_like(a) {//文章点赞
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.ARTICLE // 题材类型，请查看_UserEvents.subjectType
        };
        _UserEvents.like(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_ulike(a) {//文章取消点赞
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.ARTICLE // 题材类型，请查看_UserEvents.subjectType
        };
        _UserEvents.ulike(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_likez(commentId,a) {//评论点赞
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.COMMENT, // 题材类型，请查看_UserEvents.subjectType
            subCommentId: commentId//评论ID
        };
        _UserEvents.like(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_ulikez(commentId,a) {//评论取消点赞
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.COMMENT, // 题材类型，请查看_UserEvents.subjectType
            subCommentId: commentId//评论ID
        };
        _UserEvents.ulike(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_comment(commentId,a) {//评论
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.ARTICLE, // 题材类型，请查看_UserEvents.subjectType
            subCommentId: commentId
        };
        _UserEvents.comment(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_ucomment(commentId,a) {//取消评论
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.ARTICLE, // 题材类型，请查看_UserEvents.subjectType
            subCommentId: commentId
        };
        _UserEvents.ucomment(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_commentz(subCommentId,commentId,a) {//评论子评论
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.COMMENT, // 题材类型，请查看_UserEvents.subjectType
            subCommentId: subCommentId,
            commentId: commentId
        };
        _UserEvents.comment(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}

export function event_ucommentz(subCommentId,commentId,a) {//取消评论子评论
    if(parseInt(store.state.data.content.status)==1)
    {
        let qdata = {
            msgId: store.state.data.content.uid, // 事件ID
            platAppId: store.state.data.content.platAppId, // 企业ID、公众号ID
            platType: store.state.data.content.platType, // 应用标识 ewc：企业微信，mp：公众号
            agentId: store.state.data.content.agentId, // 企业应用ID  企业微信有值，其它无
            ucType: _UserEvents.subjectType.COMMENT, // 题材类型，请查看_UserEvents.subjectType
            subCommentId: subCommentId,
            commentId: commentId
        };
        _UserEvents.ucomment(qdata);
    }

    if("function" == typeof a && a)
    {
        a()
    }
}