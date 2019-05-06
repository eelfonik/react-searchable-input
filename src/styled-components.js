import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: ${props => props.theme.itemHeight};
  width: 100%;
`

export const Text = styled.div`
  cursor: pointer;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  line-height: ${props => props.theme.itemHeight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${props => props.disabled ? props.thems.disabledColor : 'inherit'};
  opacity: ${props => props.visible ? 1 : 0};
`;

export const Input = styled.input`
  opacity: ${props => props.visible ? 1 : 0};
  display: inline-block;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  line-height: ${props => props.theme.itemHeight};
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
  width: 100%;
  box-sizing: border-box;
  background: inherit;
  padding-top: ${props => props.hasTop ? props.theme.itemHeight : '0px'};
  max-height: ${props => props.showResults ? props.theme.listMaxHeight : '0px'};
  overflow: scroll;
  color: inherit;
`;

export const SearchListItem = styled.li`
  box-sizing: border-box;
  background: inherit;
  color: inherit;
  cursor: pointer;
  line-height: ${props => props.theme.itemHeight};
`;

export const ErrorInfo = styled.span`
  font-size: 0.8em;
  color: #ff0000;
`;

