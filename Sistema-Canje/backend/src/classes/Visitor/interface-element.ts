import Visitor from './interface-visitor';
export default interface Element {
    accept(visitor: Visitor): void;
}