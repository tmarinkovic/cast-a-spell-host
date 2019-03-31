#!/usr/bin/env bash
PUBLIC_IP=$(aws ec2 describe-instances --filters "Name=instance-type,Values=t2.nano" --profile tmarinkovic --region eu-west-1 | grep "PublicIpAddress" | head -1)
PUBLIC_IP=$(sed 's/.\{1\}$//' <<< "$PUBLIC_IP")
PUBLIC_IP="${PUBLIC_IP//\"}"
PUBLIC_IP="$(cut -d':' -f2 <<<"$PUBLIC_IP")"
export REACT_APP_PUBLIC_IP=${PUBLIC_IP}