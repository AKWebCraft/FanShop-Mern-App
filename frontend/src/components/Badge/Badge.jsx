import React from "react";

export default function Badge() {
  return (
    <span class="badge d-flex align-items-center p-1 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
      <img
        class="rounded-circle me-1"
        width="24"
        height="24"
        src="https://github.com/mdo.png"
        alt=""
      />
      Primary
    </span>
  );
}
