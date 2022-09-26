const ProcQueue = ObjC.classes.ProcQueue;
const ProcQueueService = ProcQueue.sharedInstance();
const _M = {
    send: (val) => {
        send(val);
        return _M.put('send', val);
    },
    put: (key, val) => {
        const wrapper = { type: 'proc', payload: val };
        return ProcQueueService
            .procPutObject_forKey_(
                JSON.stringify(wrapper), key)
            .valueOf();
    },
    get: (key) => {
        const wrapper = ProcQueueService
            .procObjectForKey_(key)
            .valueOf();
        return wrapper.length ? JSON.parse(wrapper).payload : null;
    },
    take: (key) => {
        const wrapper = ProcQueueService
            .procPutObject_forKey_("", key)
            .valueOf();
        return wrapper.length ? JSON.parse(wrapper).payload : null;
    },
    queue_push: (key, val) => {
        const wrapper = { type: 'proc', payload: val };
        return ProcQueueService
            .procQueuePushTailObject_forKey_(
                JSON.stringify(wrapper), key)
            .valueOf();
    },
    queue_pop: (key) => {
        const wrapper = ProcQueueService
            .procQueuePopTailObjectForKey_(key)
            .valueOf();
        return wrapper.length ? JSON.parse(wrapper).payload : null;
    },
    queue_unshift: (key, val) => {
        const wrapper = { type: 'proc', payload: val };
        return ProcQueueService
            .procQueueUnshiftObject_forKey_(
                JSON.stringify(wrapper), key)
            .valueOf();
    },
    queue_shift: (key) => {
        const wrapper = ProcQueueService
            .procQueueShiftObjectForKey_(key)
            .valueOf();
        return wrapper.length ? JSON.parse(wrapper).payload : null;
    },
    queue_clear: (key) => {
        return ProcQueueService
            .procQueueClearObjectsForKey_(key)
            .valueOf();
    },
    queue_size: (key) => {
        return ProcQueueService
            .procQueueSizeForKey_(key)
            .valueOf();
    }
};
export default _M;