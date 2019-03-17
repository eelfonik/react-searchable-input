import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: ${props => props.theme.itemHeight};
  width: 100%;
`

export const Text = styled.div.attrs(({ disabled, visible }) => ({
  bg: disabled ? '#F0F1F2' : 'inherit',
  opacity: visible ? 1 : 0
}))`
  cursor: pointer;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  line-height: ${props => props.theme.itemHeight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${props => props.bg};
  opacity: ${props => props.opacity};
`;

export const Input = styled.input.attrs(({visible}) => ({
  opacity: visible ? 1 : 0,
}))`
  opacity: ${props => props.opacity};
  display: inline-block;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  line-height: ${props => props.theme.itemHeight};
  padding: 0;
  margin: 0;
  background-color: inherit;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.mainColor};
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

export const SearchList = styled.ul.attrs(({ showResults, hasTop, theme }) => ({
  maxHeight: showResults ? theme.listMaxHeight : '0px',
  paddingTop: hasTop ? theme.itemHeight : '0px'
}))`
  width: 100%;
  box-sizing: border-box;
  background: inherit;
  padding-top: ${props => props.paddingTop};
  max-height: ${props => props.maxHeight};
  overflow: scroll;
  color: inherit;
`;

export const SearchListItem = styled.li`
  box-sizing: border-box;
  background: inherit;
  color: inherit;
  line-height: ${props => props.theme.itemHeight};
`;

export const ErrorInfo = styled.span`
  font-size: 0.8em;
  color: #ff0000;
`;

