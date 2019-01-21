"use strict";

import {varTypes} from "./varTypes";

export function handleRegistryReference(entry, registry) {
    if (entry.type === varTypes.map) {
        return {
            ...entry,
            value: Object.keys(entry.value).reduce((value, key) => {
                value[key] = handleRegistryReference(entry.value[key], registry);

                return value;
            }, {})
        }
    }

    if (entry.type === varTypes.key) {
        const match = registry.find(_entry => _entry.name === entry.value);

        return match ? {
            ...entry,
            value: match.value,
            type: match.type
        } : null;
    }

    return entry;
}