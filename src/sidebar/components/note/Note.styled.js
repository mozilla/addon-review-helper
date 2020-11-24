import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {TextareaAutosize} from '@material-ui/core';

export const TitleContainer = styled.h4`
    text-align: center;
`;

export const ButtonBack = styled(Button)`
    margin: 0 15px; 
`;

export const ButtonSave = styled(Button)`
    float: right;
    margin: 0 15px !important;
`;

export const TextareaContainer = styled(TextareaAutosize)`
    width: calc(100% - 30px);
    margin: 0 15px;
`;

