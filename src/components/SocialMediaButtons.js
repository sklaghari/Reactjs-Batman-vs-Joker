import React from 'react';
import styled, {css} from 'styled-components'
const SocialLink = styled.a`
    padding: 20px;
    font-size: 30px;
    width: 30px;
    text-align: center;
    text-decoration: none;
    margin: 5px 2px;
    border-radius: 50%
    ${props => props.facebook && css`
    background: #3B5998;
    color: white;
    `}
    ${props => props.twitter && css`
    background: #55ACEE;
    color: white;
    `}
    ${props => props.youtube && css`
    background: #bb0000;
    color: white;
    `}
    ${props => props.github && css`
    background: #bb0000;
    color: white;
    `}
    
`
export const SocialButton = ({href, children,target}) =>(
    <SocialLink href= {href} target= {target}>{children}</SocialLink>
)
