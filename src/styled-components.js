import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  height: 34px;
  width: 100%;
`

export const Text = styled.div.attrs(({ disabled, visible }) => ({
  bg: disabled ? '#F0F1F2' : 'inherit',
  opacity: visible ? 1 : 0
}))`
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${props => props.bg};
  opacity: ${props => props.opacity};
`;

export const InputWrapper = styled.div.attrs(({ collapse, border }) => ({
  maxHeight: collapse ? '0px' : '100vh',
  border,
}))`
  width: calc(100% - 5px);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  background: inherit;
  border: ${props => props.border};
  max-height: ${props => props.maxHeight};
  overflow: hidden;
  color: inherit;
`;

export const Input = styled.input`
  display: inline-block;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: inherit;
  border: 0;
  outline: none;
  font-family: inherit;
  color: inherit;
  font-size: 1em;
  line-height: 1;
  &:placeholder {
    font-family: inherit;
    font-size: 1em;
  }
`;

export const SearchList = styled.ul`
  font-size: 14px;
  border: 1px solid #e4eaf0;
  max-height: 218px;
  overflow: scroll;
`;

export const SearchListItem = styled.li`
  box-sizing: border-box;
  padding: 6px 10px;
  background: #fff;
  color: #000;
  line-height: 20px;
  &:not(:last-child) {
      border-bottom: 1px solid #e4eaf0;
  }
`;

export const ErrorInfo = styled.span`
  font-size: 0.8em;
  color: #ff0000;
`;

export const PriceValue = styled.span`
  margin-left: 0.5rem;
  font-size: 1.5em;
  color: #ffe818;
`;
