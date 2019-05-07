import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: ${props => props.theme.inputHeight};
  width: 100%;
`

export const Text = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${props => props.greyOut ? '#818181' : 'inherit'};
  background-color: ${props => props.disabled ? props.thems.disabledColor : 'inherit'};
  opacity: ${props => props.visible ? 1 : 0};
`;

export const Input = styled.input`
  opacity: ${props => props.visible ? 1 : 0};
  width: 100%;
  height: ${props => props.theme.inputHeight};
  padding: 0;
  margin: 0;
  background-color: inherit;
  border: 0;
  outline: none;
  font-family: inherit;
  color: inherit;
  font-size: 1em;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  &:placeholder {
    font-family: inherit;
    font-size: 1em;
  }
`;

export const SearchList = styled.ul`
  position: absolute;
  top: ${props => props.theme.listTop};
  left: ${props => props.theme.listLeft};
  padding: 0 ${props => props.theme.listPadding};
  width: ${props => props.theme.listWidth || '100%'};
  box-sizing: border-box;
  background-color: ${props => props.theme.listBg || 'transparent'};
  max-height: ${props => props.showResults ? props.theme.listMaxHeight : '0px'};
  overflow: scroll;
  color: inherit;
`;

export const SearchListItem = styled.li`
  box-sizing: border-box;
  background: inherit;
  color: inherit;
  cursor: pointer;
`;

export const ErrorInfo = styled.span`
  font-size: 0.8em;
  color: #ff0000;
`;

