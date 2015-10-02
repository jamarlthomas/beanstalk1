<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:rs="urn:schemas-microsoft-com:rowset" xmlns:z="#RowsetSchema">

<xsl:output method="html" />

<xsl:template match="/rs:data/z:row">
<xsl:value-of disable-output-escaping="yes" select="@ows_Title"/>
(<xsl:value-of disable-output-escaping="yes" select="@ows_Created"/>)
<br />
</xsl:template>

</xsl:stylesheet>