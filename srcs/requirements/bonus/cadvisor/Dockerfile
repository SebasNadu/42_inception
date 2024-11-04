FROM alpine:3.19

RUN apk add --no-cache \
    wget \
    libc6-compat \
    device-mapper-libs \
    thin-provisioning-tools \
    ca-certificates

RUN wget https://github.com/google/cadvisor/releases/download/v0.47.0/cadvisor-v0.47.0-linux-amd64 -O /usr/bin/cadvisor && \
    chmod +x /usr/bin/cadvisor

EXPOSE 8080

ENTRYPOINT ["/usr/bin/cadvisor", "-logtostderr"]
