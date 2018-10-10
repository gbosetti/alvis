/* Abstract class with template method */

class TableExtractor {
  createDataSetFrom(domElem) {
    return this.convertDataFrom(domElem);
  }
}
