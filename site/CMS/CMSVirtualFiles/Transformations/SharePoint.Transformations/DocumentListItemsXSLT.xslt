<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema">

<xsl:output method="html" />

<xsl:template match="/">
  <h1>Documents (<xsl:value-of select="count(/rs:data/*)"/>)</h1>
  <xsl:apply-templates select="/rs:data/z:row"/>  
</xsl:template>

<xsl:template match="/rs:data/z:row">
<xsl:value-of disable-output-escaping="yes" select="@ows_LinkFilename"/>
(<xsl:value-of disable-output-escaping="yes" select="@ows_Modified"/>)<br />
</xsl:template>
</xsl:stylesheet>