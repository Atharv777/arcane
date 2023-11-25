import React from 'react';

export default function Button(props) {

    return (
        <button className={`lexendExa rounded-lg w-max text-glow-blue border-glow-blue border-[var(--blue-light-100)] border bg-[var(--blue-10)] hover:scale-105 transition ${props.className}`} title={props.title} onClick={props.onClick}>
            {props.children}
        </button>
    )
}
