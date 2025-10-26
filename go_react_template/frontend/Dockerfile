FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG host_user_name
ARG host_group_name
ARG host_uid
ARG host_gid

RUN groupadd -f -g $host_gid $host_group_name \
  && useradd -o -m -s /bin/bash -u $host_uid -g $host_gid $host_user_name

USER $host_user_name

RUN pnpm install

EXPOSE 5173
CMD [ "pnpm", "dev" ]
